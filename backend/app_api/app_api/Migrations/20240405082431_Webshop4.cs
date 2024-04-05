using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app_api.Migrations
{
    /// <inheritdoc />
    public partial class Webshop4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ProductReceipt",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ProductReceipt");
        }
    }
}
