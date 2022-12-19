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
        public IEnumerable<Cases> GetCasesGroupsByDate(DateOnly date)
        {
            return _context.cases
                .Where(x => x.Date == date)
                .GroupBy(x => new { x.Location, x.Variant })
                .Select(g => new Cases
                {
                    Location = g.Key.Location,
                    Variant = g.Key.Variant,
                    numSequences = g.Sum(x => x.numSequences)
                });
        }
        
        [HttpGet("{date}/cumulative")]
        public IEnumerable<Cases> GetCumulativeCasesByDate(DateOnly date)
        {
            return _context.cases
                .Where(x => x.Date <= date)
                .GroupBy(x => new {x.Location, x.Variant})
                .Select(g => new Cases
                {
                    Location = g.Key.Location,
                    Variant = g.Key.Variant,
                    numSequences = g.Sum(x => x.numSequences)
                });
        }

        [HttpGet("/dates")]
        public IEnumerable<DateOnly> GetDates()
        {
            var dates = (from d in _context.cases
                        select d.Date).Distinct().OrderBy(d => d);
            return dates;
        }
    }
}