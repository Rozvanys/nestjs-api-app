import { BadRequestException, Controller, Delete, Get, NotFoundException, Param, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  nevek = ['Ádám', 'Éva', 'Dávid', 'Boldizsár']

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('nevek')
  getNevek(){
    return this.nevek;
  }

  @Get('nevek/:id')
  getNev(@Param('id') id: string) {
    
    const index = Number(id);

    if (isNaN(index)) {
      throw new BadRequestException('Az id-nek szémnak kell lennie');
    }

    if (!this.nevek[index]){
      throw new NotFoundException("Nincs ilyen név")
    }

    return this.nevek[index];
  }

  @Delete('nevek/:id')
  deleteNev(@Param('id') id: string){
    const index = Number(id)

    this.nevek.splice(index, 1);
  }
}
