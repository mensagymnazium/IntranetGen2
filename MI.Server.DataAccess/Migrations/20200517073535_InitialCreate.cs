using Microsoft.EntityFrameworkCore.Migrations;

namespace MI.Server.DataAccess.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Subjects",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "SigningRules",
                nullable: true);

            migrationBuilder.Sql(
                @"
                    UPDATE Subjects
                    SET Category = 0");

            migrationBuilder.Sql(
                @"
                    UPDATE SigningRules
                    SET Category = 0");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SigningRules");

            migrationBuilder.DropTable(
                name: "UserSubjects");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
