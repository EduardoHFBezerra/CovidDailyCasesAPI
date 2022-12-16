using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using CovidDailyCases.API.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);
builder.Services.AddControllers().AddJsonOptions(options => {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                }
);
builder.Services.AddSwaggerGen(c =>
{
    c.MapType<DateOnly>(() => new OpenApiSchema { Type = "string", Format = "date" });
});
builder.Services.AddDateOnlyTimeOnlyStringConverters();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger(c =>{
    c.PreSerializeFilters.Add((document, request) =>
    {
        var paths = document.Paths.ToDictionary(item => item.Key.ToLowerInvariant(), item => item.Value);
        document.Paths.Clear();
        foreach (var pathItem in paths)
        {
            document.Paths.Add(pathItem.Key, pathItem.Value);
        }
    });
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(options => options.AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowAnyOrigin());

app.MapControllers();

app.Run();
