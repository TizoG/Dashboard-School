// formidable-serverless.d.ts
declare module "formidable-serverless" {
  export function formidable(options?: any): {
    parse: (req: Request) => Promise<{ fields: any; files: any }>;
  };
}
