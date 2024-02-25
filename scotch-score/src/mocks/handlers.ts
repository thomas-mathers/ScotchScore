import { http, HttpResponse, RequestHandler } from 'msw';

const handlers: RequestHandler[] = [
  http.post('*/scotches/*/reviews', () => {
    return HttpResponse.json({});
  }),
];

export { handlers };
