import {Controller,Post,Body,Param,Patch,Get,UseGuards,ParseIntPipe } from '@nestjs/common';
  import { FineService } from './fine.service';
  import { CreateFineDto } from '../DTO/create-fine.dto';
  import { WaiveFineDto } from '../DTO/waive-fine.dto';
  import { AutoFineDto } from '../DTO/auto-fine.dto';
  
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  import { UserRole } from '../entities/user.entity'; // ✅ import enum
  
  @Controller('fine')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class FineController {
    constructor(private fineService: FineService) {}
  
    @Post('generate')
   // @Roles(UserRole.Admin, UserRole.Librarian) 
    @Roles(UserRole.Admin, UserRole.Librarian,UserRole.User) 
    generate(@Body() dto: CreateFineDto) {
      return this.fineService.createFine(dto);
    }
  
    @Post('auto-fine')
    //@Roles(UserRole.Admin, UserRole.Librarian)
    @Roles(UserRole.Admin, UserRole.Librarian,UserRole.User)
    autoGenerateFine(@Body() dto: AutoFineDto) {
        return this.fineService.generateAutoFine(dto.userId, dto.borrowingId);
      }


      @Patch(':id/pay')
      @Roles(UserRole.Admin, UserRole.Librarian, UserRole.User)
      pay(@Param('id', ParseIntPipe) id: number) {
        return this.fineService.payFine({ fineId: id });
      }
  
    @Patch(':id/waive')
    @Roles(UserRole.Admin, UserRole.Librarian, UserRole.User)
    waive(@Param('id', ParseIntPipe) id: number, @Body() dto: WaiveFineDto) {
      return this.fineService.waiveFine(id, dto.reason);
    }
    
  
    @Get('user/:userId')
   // @Roles(UserRole.User, UserRole.Admin) 
    @Roles(UserRole.User, UserRole.Admin,UserRole.User) 
    getUserFines(@Param('userId') userId: number) {
      return this.fineService.getUserFines(userId);
    }

    @Get('account-summary')
@Roles(UserRole.Admin, UserRole.Librarian)
getAccountSummary() {
  return this.fineService.getAccountSummary();
}

  }
  