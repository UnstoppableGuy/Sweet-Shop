using Dropbox.Api;
using Dropbox.Api.Files;
using System.Text;

namespace SweetShop.Services
{
    public class CloudStorageServics
    {
        private readonly string token = ;
        private readonly DropboxClient dbx;
        CloudStorageServics()
        {
            dbx = new DropboxClient(token);
        }

        //static async Task Run()
        //{
        //    using (var dbx = new DropboxClient(token))
        //    {
        //        var full = await dbx.Users.GetCurrentAccountAsync();
        //        Console.WriteLine("{0} - {1}", full.Name.DisplayName, full.Email);
        //    }
        //}
        async Task ListRootFolder()
        {
            var list = await dbx.Files.ListFolderAsync(string.Empty);

            // show folders then files
            foreach (var item in list.Entries.Where(i => i.IsFolder))
            {
                Console.WriteLine("D  {0}/", item.Name);
            }

            foreach (var item in list.Entries.Where(i => i.IsFile))
            {
                Console.WriteLine("F{0,8} {1}", item.AsFile.Size, item.Name);
            }
        }
        async Task Download(string folder, string file)
        {
            using (var response = await dbx.Files.DownloadAsync(folder + "/" + file))
            {
                Console.WriteLine(await response.GetContentAsStringAsync());
            }
        }
        async Task Upload(string folder, string file, string content)
        {
            using (var mem = new MemoryStream(Encoding.UTF8.GetBytes(content)))
            {
                var updated = await dbx.Files.UploadAsync(
                    folder + "/" + file,
                    WriteMode.Overwrite.Instance,
                    body: mem);
                Console.WriteLine("Saved {0}/{1} rev {2}", folder, file, updated.Rev);
            }
        }
    }
}
