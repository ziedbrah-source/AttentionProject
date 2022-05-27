import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CameraProductsService } from './camera-products.service';
import { CreateCameraProductDto } from './dto/create-camera-product.dto';
import { UpdateCameraProductDto } from './dto/update-camera-product.dto';
import { GetUser } from '../auth/decorator/getUser.paramDecorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('camera-products')
export class CameraProductsController {
  constructor(private readonly cameraProductsService: CameraProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCameraProductDto: CreateCameraProductDto,
    @GetUser() user: User,
  ) {
    return this.cameraProductsService.create(createCameraProductDto, user);
  }

  @Get()
  findAll() {
    return this.cameraProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cameraProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCameraProductDto: UpdateCameraProductDto,
  ) {
    return this.cameraProductsService.update(+id, updateCameraProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cameraProductsService.remove(+id);
  }
}
