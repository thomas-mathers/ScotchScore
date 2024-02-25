import { http, HttpResponse, RequestHandler } from 'msw';

const handlers: RequestHandler[] = [
  http.post('*/scotches/*/reviews', () => {
    return HttpResponse.json({});
  }),
  http.post('*/reviews/*/votes', () => {
    return HttpResponse.json({});
  }),
];

export { handlers };
