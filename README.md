eslin: ^8.56.0
yarn install
// Run app on VScode
--admin: yarn dev:admin
--consumer: yarn dev:consumer
--server: yarn dev:server

migration:
// run app on Visual Studio
-- mở file appsettings.json
    ở DefaultConnection đổi phần Server: theo local SQL Server của máy vd: Server=DUYNO1\\SQLEXPRESS;
--open Tool -> Nuget Package Manager -> Package Manager Console
    chạy: add-migration "initial migration"
        : update-database