﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UserType
    {
        Student = 10,
        Teacher = 20,
        Admin = 100
    }
}
