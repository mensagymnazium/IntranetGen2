using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Enums
{
	public static class EnumExtensions
	{
		public static List<T> ToList<T>(this T enumToConvert)
			where T : struct
		{
			if (!typeof(T).IsEnum)
			{
				throw new ArgumentException("T must be an enumerated type");
			}

			return
			   enumToConvert
			   .ToString() // Convert the enum to string
			   .Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries) // Converts the string to Enumerable of string
			   .Select(//converts each element of the list to an enum, and makes an Enumerable out of the newly-converted items
				   strenum =>
				   {
					   T outenum;
					   Enum.TryParse(strenum, out outenum);
					   return outenum;
				   })
			   .ToList(); // Creates a List from the Enumerable
		}

		public static string ToEnumMemberAttrValue(this Enum @enum)
		{
			var attr =
				@enum.GetType().GetMember(@enum.ToString()).FirstOrDefault()?.
					GetCustomAttributes(false).OfType<EnumMemberAttribute>().
					FirstOrDefault();
			if (attr == null)
			{
				return @enum.ToString();
			}

			return attr.Value;
		}
	}
}
