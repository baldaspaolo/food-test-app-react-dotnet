global using app_api.Models;
global using app_api.Data;
using Microsoft.EntityFrameworkCore;
using app_api.Services.FoodService;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using app_api.Services.UserService;
using app_api.Services.DepartmentService;
using app_api.Services.ToDoService;
using app_api.Services.TaskService;
using app_api.Services.CartService;
using app_api.Services.CartPorduct;
using app_api.Services.ProductService;
using app_api.Services.ReceiptService;
using app_api.Services.RecipeProductService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IFood, FoodService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IToDoService, ToDoService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IReceiptService, ReceiptService>();
builder.Services.AddScoped<IRecipeProductService, ReceiptProductService>();




builder.Services.AddScoped<ICartProductService, CartProductService>();

builder.Services.AddDbContext<DataContext>();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

var app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
