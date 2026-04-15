import { http, HttpResponse } from 'msw';
import { mockPets } from './mockData';

export const handlers = [
  http.get('/pets', () => {
    return HttpResponse.json(mockPets);
  }),
  http.get('/pets/:id', ({ params }) => {
    const { id } = params;
    const pet = mockPets.find(p => p.id === id);
    if (!pet) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(pet);
  }),
];
