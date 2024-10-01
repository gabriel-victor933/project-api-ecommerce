import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { dataSourceOptions } from './db/databaseConfig';
import { CommentsModule } from './comments/comments/comments.module';
import { StockModule } from './stock/stock.module';
import { FeaturesModule } from './features/features.module';
import { ImagesModule } from './images/images.module';
import { BucketModule } from './bucket/bucket.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { SizesModule } from './sizes/sizes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    CommentsModule,
    StockModule,
    FeaturesModule,
    ImagesModule,
    BucketModule,
    ProductTypeModule,
    SizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
