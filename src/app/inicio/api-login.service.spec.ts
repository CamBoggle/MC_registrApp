import { TestBed } from '@angular/core/testing';

import { ApiLoginService } from './api-login.service';
import { Database } from '@angular/fire/database';


class MockDatabaseService {
    // Simula las funciones y valores que esperas utilizar en tus pruebas
    // Por ejemplo:
    someMethod() {
      return /* valor mockeado */;
    }
  }
  

  describe('ApiLoginService', () => {
    let service: ApiLoginService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        // Proporciona el mock del servicio Database
        providers: [
          ApiLoginService,
          { provide: Database, useClass: MockDatabaseService }
        ]
      });
      service = TestBed.inject(ApiLoginService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });