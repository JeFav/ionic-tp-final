import { TestBed } from '@angular/core/testing';
import { DiscogsApiService } from './discogs-api.service';

describe('DiscogsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscogsApiService = TestBed.get(DiscogsApiService);
    expect(service).toBeTruthy();
  });
});
