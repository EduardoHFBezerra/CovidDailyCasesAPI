using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CovidDailyCases.API.Models;
using CovidDailyCases.API.Data;

namespace CovidDailyCases.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CasesController : ControllerBase
    {
        private readonly DataContext _context;
        public CasesController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("/")]
        public string Get()
        {
            return "Fullstack Challenge 2021 🏅 - Covid Daily Cases";
        }
        
        [HttpGet("{date}/count")]
        public IEnumerable<Cases> GetAll(DateOnly date)
        {
            return _context.cases
                .AsEnumerable()
                .Where(x => x.Date == date)
                .GroupBy(x => (x.Location, x.Variant))
                .SelectMany(g => g);
        }
        
        [HttpGet("{date}/cumulative")]
        public IEnumerable<Cases> GetAllCumulative(DateOnly date)
        {
            return _context.cases
                .Join(
                _context.cases,
                a => new { a.Location, a.Variant },
                    b => new { b.Location, b.Variant },
                (a, b) => new
                {
                    a,
                    b
                }
            )
            .Where(x => x.a.Date == date && x.b.Date <= date)
            .GroupBy(x => new { x.a.Location, x.a.Variant })
            .Select(g => new Cases
            {
                Location = g.Key.Location,
                Variant = g.Key.Variant,
                numSequences = g.Sum(x => x.b.numSequences)
            });
        }

        [HttpGet("/dates")]
        public IEnumerable<DateOnly> GetDates()
        {
            var dates = (from d in _context.cases
                        select d.Date).Distinct();
            return dates;
        }
    }
}