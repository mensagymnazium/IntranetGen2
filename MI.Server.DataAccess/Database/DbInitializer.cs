using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;
using System.Linq;

namespace MI.Data.DataAccess.Database
{
    public static class DbInitializer
    {
        public static void Initialize(MensaIntranetContext context)
        {
            context.Database.EnsureCreated();
            // TODO init data
        }
    }
}
