import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
// import { AuthGuard } from './product/guards/products.guards';
import { AuthGuard } from './product/gaurds/products.guards';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe({ 
    skipMissingProperties: true,
    transform: true,
    whitelist: true
  }));
  const config = new DocumentBuilder()
  .setTitle('Nest API')
  .setDescription('the description of the API')
  .setVersion('1.0')
  .setBasePath('/')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/',app,document)
  await app.listen(3001);
}
bootstrap();