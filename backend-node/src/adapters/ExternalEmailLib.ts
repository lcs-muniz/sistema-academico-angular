// Mock external email library with a different API shape
export class ExternalEmailLib {
  async send(to: string, subject: string, body: string): Promise<void> {
    // Simulate external send
    return;
  }
}
