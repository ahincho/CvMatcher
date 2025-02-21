export interface DeleteOneUserUseCase {
  execute(userId: number): Promise<void>;
}
