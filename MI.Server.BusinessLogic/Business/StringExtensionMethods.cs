using System;
using System.Collections.Generic;

namespace MI.Server.BusinessLogic.Business
{
	public static class StringExtensionMethods
	{
		public static List<string> ExtractFromBody(this string body, string start, string end)
		{
			List<string> matched = new List<string>();

			int indexStart = 0;
			int indexEnd = 0;

			bool exit = false;
			while (!exit)
			{
				indexStart = body.IndexOf(start);

				if (indexStart != -1)
				{
					indexEnd = indexStart + body.Substring(indexStart).IndexOf(end);

					var text = body.Substring(indexStart + start.Length, indexEnd - indexStart - start.Length);
					text = text.Replace(Environment.NewLine, " ");
					text = text.Trim();
					matched.Add(text);

					body = body.Substring(indexEnd + end.Length);
				}
				else
				{
					exit = true;
				}
			}

			return matched;
		}
	}
}