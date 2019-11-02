namespace MI.Server.DataAccess.DbObjects
{
    public abstract class UserBase : DbBase
    {
        public string UserName { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }
    }
}
