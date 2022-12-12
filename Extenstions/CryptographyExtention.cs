

namespace SweetShop.Extenstions
{
    public class CryptographyExtention
    {
        public static string CreateHash(string input)
        {
            const int WORK_FACTOR = 12;

            var hash = BCrypt.Net.BCrypt.HashPassword(input, WORK_FACTOR);

            return hash;
        }

        public static bool Verify(string input, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(input, hash);
        }
    }
}
