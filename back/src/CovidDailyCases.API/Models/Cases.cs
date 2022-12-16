using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CovidDailyCases.API.Models
{
    public class Cases
    {
        public int Id { get; set; }
        public string? Location { get; set; }
        public DateOnly Date { get; set; }
        public string? Variant { get; set; }
        public int numSequences { get ; set; }
    
        [RegularExpression(@"^(0|-?\d{0,16}(\.\d{0,2})?)$")]
        public Decimal percSequences { get ; set; }
        public int numSequencesTotal { get ; set; }
        public Cases()
        {

        }
    }
}