import { Injectable, Logger } from '@nestjs/common';
import { JobProviderPort } from 'src/jobs/application/ports/out/job.provider.port';
import { Job } from 'src/jobs/domain/models/job.model';
import { chromium } from 'playwright';

@Injectable()
export class JobLaborumProviderAdapter implements JobProviderPort {
  private readonly logger = new Logger(JobLaborumProviderAdapter.name);
  async findJobs(): Promise<Job[]> {
    this.logger.log('Starting Laborum scraping');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.route('**/*', (route) => {
      const request = route.request();
      if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        route.abort();
      } else {
        route.continue();
      }
    });
    try {
      await page.goto('https://www.laborum.pe/search-jobs', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      await page.waitForSelector('li[class^="MuiListItem-root"]', {
        timeout: 10000,
      });
      this.logger.log('Page loaded successfully.');
      const publishedAt = new Date();
      const jobsData = await page.evaluate((publishedAt) => {
        return Array.from(
          document.querySelectorAll('li[class^="MuiListItem-root"]'),
        ).map((jobElement) => {
          const titleElement = jobElement.querySelector('h6');
          const companyElement = jobElement.querySelector('p');
          const locationElement = jobElement.querySelector('li span[title]');
          const linkElement = jobElement.querySelector('a');
          const href = linkElement?.getAttribute('href') || '';
          const uuidMatch = href.match(/\/([^\/]+)$/);
          const jobId = uuidMatch ? uuidMatch[1] : 'No ID';
          const location =
            locationElement?.textContent || 'Location not available';
          return {
            id: jobId,
            title: titleElement?.textContent?.trim() || 'Not specified',
            description: `Location: ${location}`,
            company: companyElement?.textContent?.trim() || 'Not specified',
            location: location,
            publishedAt: publishedAt,
          };
        });
      }, publishedAt);
      this.logger.log(`Total jobs extracted: ${jobsData.length}`);
      const jobs = jobsData.map((job) => new Job({ ...job }));
      return jobs;
    } catch (error) {
      this.logger.error('Error during scraping:', error);
      return [];
    } finally {
      await browser.close();
    }
  }
}
