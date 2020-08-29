using System;
using System.Collections.Generic;
using MI.Server.DataAccess.DbObjects.Enums;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class AssignmentDb : DbBase
    {
        public string Name { get; set; }

        public DateTime Deadline { get; set; }

        public DateTime ActiveFrom { get; set; }

        public string SolutionPath { get; set; }

        public ProgrammingGroup Group { get; set; }

        public string Url { get; set; }

        public int MaxNumberOfUploads { get; set; }

        public bool Required { get; set; }

        public ICollection<SubmissionDb> Submissions { get; set; }
    }
}