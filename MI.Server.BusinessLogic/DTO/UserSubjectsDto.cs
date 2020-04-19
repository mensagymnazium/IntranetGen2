using MI.Server.DataAccess.DbObjects.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class UserSubjectsDto
    {
        public string Username { get; set; }

        public int SubjectId { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Priority Priority { get; set; }
    }
}
