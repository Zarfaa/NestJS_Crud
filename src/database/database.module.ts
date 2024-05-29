import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mssql',
          host: "DESKTOP-I3VHGAP\\SQLEXPRESS",
          port : 1433,
          username: 'sa',
          password: 'Jango1234#',
          database: 'library',
          options: {
            encrypt: true,
            trustServerCertificate: true,
          },
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
        });
        try {
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.error('Error connecting to database:', error);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
