using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app_api.Migrations
{
    /// <inheritdoc />
    public partial class Webshop3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Products_ProductId",
                table: "Receipts");

            migrationBuilder.DropIndex(
                name: "IX_Receipts_ProductId",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Receipts");

            migrationBuilder.AlterColumn<float>(
                name: "TotalAmount",
                table: "Receipts",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.CreateTable(
                name: "ProductReceipt",
                columns: table => new
                {
                    ProductsId = table.Column<int>(type: "int", nullable: false),
                    ReceiptsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductReceipt", x => new { x.ProductsId, x.ReceiptsId });
                    table.ForeignKey(
                        name: "FK_ProductReceipt_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductReceipt_Receipts_ReceiptsId",
                        column: x => x.ReceiptsId,
                        principalTable: "Receipts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceipt_ReceiptsId",
                table: "ProductReceipt",
                column: "ReceiptsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductReceipt");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "Receipts",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Receipts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_ProductId",
                table: "Receipts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Products_ProductId",
                table: "Receipts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
