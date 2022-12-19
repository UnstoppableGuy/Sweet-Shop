using System.Data.SqlClient;
using System.Runtime.ConstrainedExecution;
using SweetShop.Database.Models;
using SweetShop.Extenstions;
using SweetShop.ModelView;
using static Dropbox.Api.Files.ListRevisionsMode;

namespace SweetShop.Database
{
    delegate void Logger(string info);

    public class DataContext
    {
        private static readonly string connectionString = "";
        private readonly SqlConnection connection = new(connectionString);
        private event Logger Log;
        public DataContext()
        {
            connection = new SqlConnection(connectionString);
            Log += AddLog;
        }
        private List<T> ReadProcedure<T>(string procedureName, Dictionary<string, object> parameters) where T : new()
        {
            connection.Open();
            var command = new SqlCommand();
            command.SetParameters(connection, procedureName, parameters);
            var result = command.Read<T>();
            connection.Close();
            return result;
        }
        private void WriteProcedure(string procedureName, Dictionary<string, object> parameters)
        {
            connection.Open();
            var command = new SqlCommand();
            command.SetParameters(connection, procedureName, parameters);
            command.ExecuteNonQuery();
            connection.Close();
        }

        ///////////////////

        public List<Tag> GetAllTags() => ReadProcedure<Tag>("GetAllTags", null);
        public List<Adress> GetAllAddress() => ReadProcedure<Adress>("GetAllAddresses", null);
        public List<Category> GetAllCategories() => ReadProcedure<Category>("GetAllCategories", null);
        public List<Comment> GetAllComments() => ReadProcedure<Comment>("GetAllComments", null);
        public List<Log> GetAllLogs() => ReadProcedure<Log>("GetAllLogs", null);
        public List<Product> GetAllProducts() => ReadProcedure<Product>("GetAllProducts", null);
        public List<ProductReview> GetAllReviews() => ReadProcedure<ProductReview>("GetAllReviews", null);
        public List<Shop> GetAllShops() => ReadProcedure<Shop>("GetAllShops", null);
        public List<Transaction> GetAllTransaction() => ReadProcedure<Transaction>("GetAllTransactions", null);
        public List<User> GetAllUsers() => ReadProcedure<User>("GetAllUsers", null);

        public List<Tag> GetTags(Guid id)
        {
            var tags = ReadProcedure<ProductTag>("GetProductTags", new Dictionary<string, object>
            {
                {"@Id", id}
            });
            List<Tag> tagsList = new();
            foreach (var item in tags)
            {
                tagsList.Add(GetTag(item.TagId));
            }
            return tagsList;
        }


        /*add*/
        public Guid AddAddress(Guid shopid, string country, string city, string street, string housenumber, string postalcode)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddAddress", new Dictionary<string, object>
            {
                {"@id", id },
                {"@ShopId", shopid },
                {"@country",country },
                {"@city", city },
                {"@street",street },
                {"@housenumber", housenumber },
                {"@postalcode",postalcode }

            });
            Log($"Country: {country} postalcode: {postalcode} address added");
            return id;
        }
        public Guid AddCart(Guid userid)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddCart", new Dictionary<string, object>
            {
                {"@id", id },
                {"@UserId", userid }
            });
            Log($"Create cart for user: {userid}");
            return id;

        }
        public Guid AddCartItem(Guid cartid, Guid productid, int qty)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddCartItem", new Dictionary<string, object>
            {
                {"@id", id },
                {"@CartId", cartid },
                {"@ProductId", productid },
                {"@qty", qty }
            });
            Log($"Added to card: {cartid} product: {productid} qty: {qty}");
            return id;
        }
        public Guid AddCategory(string title, string description)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddCategory", new Dictionary<string, object>
            {
                {"@id", id },
                {"@Title", title},
                {"@Description", description}
            });
            Log($"Added category: {title}");
            return id;

        }
        public Guid AddComment(Guid userid, Guid prodcutid, string message)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddComment", new Dictionary<string, object>
            {
                {"@id", id},
                {"@UserId", userid },
                {"@ProductId", prodcutid},
                {"@message", message},
                {"@updatedAt", DateTime.UtcNow },
                {"@publishedAt", DateTime.UtcNow }
            });
            Log($"Added comment to product {prodcutid} user {userid}");
            return id;
        }
        public Guid AddImage(string url, Guid productid)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddImage", new Dictionary<string, object>
            {
                {"@id", id },
                {"@ProductId", productid },
                {"@url", url }
            });
            return id;

        }
        public Guid AddOrder(Guid userid, Guid addressid, DateTime devilerydate, string status)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddOrder", new Dictionary<string, object>
            {
                {"@id", id},
                {"@UserId", userid},
                {"@AddressId", addressid},
                {"@deliveryDate",devilerydate },
                {"@status", status},
                {"@createdAt",DateTime.UtcNow}
            });
            Log($"Added Order for {userid}");
            return id;

        }
        public Guid AddOrderLine(Guid orderid, Guid productid, int qty, decimal price)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddOrderLine", new Dictionary<string, object>
            {
                {"@id", id},
                {"@OrderId", orderid},
                {"@ProductId", productid},
                {"@qty", qty },
                {"@price", price }
            });
            return id;

        }
        public Guid AddProduct(string name, string description, decimal price)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddProduct", new Dictionary<string, object>
            {
                {"@id", id },
                {"@name", name},
                {"@description", description},
                {"@price", price},

            });
            Log($"Product: {name} price: {price} added");
            return id;

        }
        public void AddProductCategory(Guid productid, Guid categoryid)
        {
            WriteProcedure("AddProductCategory", new Dictionary<string, object>
            {
                {"@ProductId", productid },
                {"@CategoryId", categoryid }
            });
        }
        public Guid AddProductReview(Guid productid, Guid userid, string title, string text, float rating)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddProductReview", new Dictionary<string, object>
            {
                {"@id", id},
                {"@ProductId", productid},
                { "@UserId", userid},
                { "@Title", title},
                {"@text",text },
                {"@rating", rating },
                {"@publishedAt", DateTime.UtcNow }
            });
            Log($"Review for {productid} by {userid} added");
            return id;
        }
        public void AddProductShop(Guid productid, Guid shopid)
        {
            WriteProcedure("AddProductShop", new Dictionary<string, object>
            {
                {"@ProductId", productid },
                {"@ShopId", shopid }
            });
        }
        public void AddProductTag(Guid tagid, Guid productid)
        {
            WriteProcedure("AddProductTag", new Dictionary<string, object>
            {
                {"@TagId", tagid },
                {"@ProductId", productid }
            });
        }
        public Guid AddShop(Guid userid, string name, string description, string number)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddShop", new Dictionary<string, object>
            {
                { "@id", id },
                { "@UserId", userid },
                { "@name", name },
                { "@description", description },
                { "@IPNumber", number }
            });
            return id;
        }
        public Guid AddTag(string text)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddTag", new Dictionary<string, object>
            {
                {"@id", id},
                {"@text", text},
            });
            Log($"Tag: {text} added");
            return id;
        }
        public Guid AddTransaction(Guid orderid, string status, decimal amount, string code)
        {
            var id = Guid.NewGuid();
            WriteProcedure("AddTransaction", new Dictionary<string, object>
            {
                {"@id", id},
                {"@OrderId", orderid},
                {"@status", status},
                {"@TransactionCode", code},
                {"@Amount", amount },
                {"@createdAt", DateTime.UtcNow },
                {"updatedAt", DateTime.UtcNow }
            });
            Log($"Transaction for {orderid} added");
            return id;
        }
        public Guid AddUser(string firstname, string lastname, string email, string mobile, string password)
        {
            var id = Guid.NewGuid();
            var result = ReadProcedure<User>("AddUser", new Dictionary<string, object>
            {
                {"@id", id },
                {"@FirstName", firstname },
                {"@LastName", lastname },
                {"@email", email },
                {"@mobile", mobile },
                {"@isAdmin", 0 },
                {"@registeredAt", DateTime.UtcNow },
                {"@passwordhash", CryptographyExtention.CreateHash(password)}
            });
            Log($"User: {firstname} email: {email} registered");
            return id;

        }
        public void AddLog(string info)
        {
            WriteProcedure("AddLog", new Dictionary<string, object>
            {
                {"@id", Guid.NewGuid() },
                { "@Info", info },
                { "@Date", DateTime.UtcNow }
            });
        }
        /*get one model data*/
        public User GetUser(string email)
        {
            var user = ReadProcedure<User>("GetUser", new Dictionary<string, object>
            {
                {"@email", email }
            });
            return user[0];
        }

        public Tag GetTag(Guid id)
        {
            var tag = ReadProcedure<Tag>("GetTag", new Dictionary<string, object>
            {
                {"@id", id }
            });
            return tag[0];
        }
        public List<CartView> GetCart(Guid id)
        {
            var cart = ReadProcedure<CartView>("GetCart", new Dictionary<string, object>
            {
                {"@Id", id }
            });

            return cart;
        }
        public ProfileView GetShop(Guid userid)
        {
            var shop = ReadProcedure<ProfileView>("GetShop", new Dictionary<string, object>
            {
                {"@userid", userid }
            });
            return shop[0];
        }
        public Shop GetShop2(Guid userid)
        {
            var shop = ReadProcedure<Shop>("GetShop2", new Dictionary<string, object>
            {
                {"@Id", userid }
            });
            Console.WriteLine($"Shopid {shop[0]}");
            return shop[0];
        }
        public ProductShop GetProductShop(Guid productid)
        {
            var shop = ReadProcedure<ProductShop>("GetProductShop", new Dictionary<string, object>
            {
                {"@Id", productid }
            });
            return shop[0];
        }
        public Shop GetShopByIdProduct(Guid productid)
        {
            var shop = ReadProcedure<Shop>("GetShop", new Dictionary<string, object>
            {
                {"@Id", productid }
            });
            return shop[0];
        }
        public Adress GetAdress(Guid id)
        {
            var address = ReadProcedure<Adress>("GetAddress", new Dictionary<string, object>
            {
                {"@ShopId", id}
            });
            return address[0];
        }


        public CartItem GetCartItem(Guid productid)
        {
            var cartitem = ReadProcedure<CartItem>("GetCartItem", new Dictionary<string, object>
            {
                {"@productid", productid }
            });
            return cartitem[0];
        }
        public Product GetProduct(Guid id)
        {
            var product = ReadProcedure<Product>("GetProduct", new Dictionary<string, object>
            {
                {"@id", id }
            });
            return product[0];
        }

        public void UpdateComment(Guid id, Guid productid, Guid userid, string message)
        {
            WriteProcedure("UpdateComment", new Dictionary<string, object>
            {
                {"@id", id},
                {"@productid", productid},
                {"@userid", userid },
                {"@message", message },
                {"@updatedAt", DateTime.UtcNow }
            });
        }
        public void UpdateOrder(Guid id, string status)
        {
            WriteProcedure("UpdateOrder", new Dictionary<string, object>
            {
                { "@id", id},
                { "@status", status },
            });
        }
        public void UpdateTransaction(Guid id, string status)
        {
            WriteProcedure("UpdateTransaction", new Dictionary<string, object>
            {
                { "@id", id},
                { "@status", status },
            });
        }
        public List<ProductReview> GetUserProductReview(Guid id, Guid productid, int page)
        {
            var productreviews = ReadProcedure<ProductReview>("GetUserProductReview", new Dictionary<string, object>
            {
                {"@id",id },
                {"@ProductId", productid },
                {"@page", page }

            });
            return productreviews;
        }

        public List<Comment> GetComments(Guid id)
        {
            var comment = ReadProcedure<Comment>("GetComments", new Dictionary<string, object>
            {
                {"@id",id }
            });
            return comment;
        }

        public List<Category> GetCategories(Guid id)
        {
            var pc = ReadProcedure<ProductCategory>("GetCategories", new Dictionary<string, object>
            {
                {"@id",id }
            });
            List<Category> categorieList = new();
            foreach (var category in pc)
            {
                categorieList.Add(GetCategory(category.CategoryId));
            }
            return categorieList;
        }

        public List<Product> GetProductsById(Guid id, int page)
        {
            var pc = ReadProcedure<Product>("GetCategoriesById", new Dictionary<string, object>
            {
                {"@id",id },
                {"@page", page}
            });
            return pc;
        }

        public Category GetCategory(Guid id)
        {
            var category = ReadProcedure<Category>("GetCategory", new Dictionary<string, object>
            {
                {"@id",id }
            });
            return category[0];
        }

        public void UpdateUser(Guid id, string firstname, string lastname, string mobile)
        {
            WriteProcedure("UpdateUser", new Dictionary<string, object>
            {
                {"@id", id },
                {"@firstname", firstname },
                {"@lastname", lastname},
                {"@mobile", mobile }
            });
        }
        public void ShopUpdate(Guid id, string description, string name)
        {
            WriteProcedure("UpdateShop", new Dictionary<string, object>
            {
                {"@id", id },
                {"@Name", name },
                {"@Description", description }
            });
        }
        public List<Image> GetImages(Guid id)
        {
            var img = ReadProcedure<Image>("GetImages", new Dictionary<string, object>
            {
                {"@id",id }
            });
            return img;
        }
        public void UpdateProductReview(Guid productid, Guid userid, string message, float rating)
        {
            WriteProcedure("UpdateReview", new Dictionary<string, object>
            {
                {"@productid", productid},
                {"@userid", userid },
                {"@message", message },
                {"@rating", rating }
            });
        }
        //TODO
        public void UpdateProduct(decimal price, Guid productid)
        {
            WriteProcedure("UpdateProduct", new Dictionary<string, object>{
                {"@price", price},
                {"@id", productid}
            });
        }

        public List<ProductReview> GetProductReviews(Guid productid, int page)
        {
            var pv = ReadProcedure<ProductReview>("GetProductReview", new Dictionary<string, object>
            {
                {"@productid", productid },
                {"@page", page }
            });
            return pv;
        }
        public double GetRaiting(Guid productid)
        {
            using SqlConnection connection = new SqlConnection(connectionString);
            string text = $"exec GetRaiting @id='{productid}'";
            using (SqlCommand cmd = new (text, connection))
            {
                connection.Open();
                var result = cmd.ExecuteScalar();
                Console.WriteLine($"rating in method {result}");
                return (double)result;
            }
        }
        //TODO
        internal List<Product> Get4Products(Guid id)
        {
            throw new NotImplementedException();
        }

        internal Comment GetComment(Guid id)
        {
            throw new NotImplementedException();
        }

        public bool IsFreeEmail(string email)
        {
            var res = ReadProcedure<User>("CheckEmail", new Dictionary<string, object>
            {
                { "@email", email}
            });
            Console.WriteLine($"Account exists {res.Count}");
            if (res.Count == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Comment> GetProductComments(Guid id, int page)
        {
            var comments = ReadProcedure<Comment>("GetProductComments", new Dictionary<string, object>
            {
                {"@id", id },
                {"@page", page }
            });
            return comments;
        }
        public List<Comment> GetUserComments(Guid id, Guid productid, int page)
        {
            var comments = ReadProcedure<Comment>("GetUserComments", new Dictionary<string, object>
            {
                {"@id",id },
                {"@ProductId", productid },
                {"@page", page }

            });
            return comments;
        }

        public List<Product> GetProducts(int page)
        {
            var item = ReadProcedure<Product>("GetProducts", new Dictionary<string, object>
            {
                {"@page", page }
            });
            return item;
        }
        public void DeleteImage(Guid id)
        {
            WriteProcedure("DeleteImage", new Dictionary<string, object>
            {
                {"@id", id }
            });
        }
        public int GetCountProduct(Guid id)
        {
            Console.WriteLine(id);
            string text = $"exec GetCountProduct @categoryid='{id}'";
            using (SqlCommand cmd = new (text, connection))
            {
                
                connection.Open();
                object count = cmd.ExecuteScalar();
                int value = (int)count;
                Console.WriteLine($"Counter {value}");
                return value;
            }
        }

        public int GetCountProduct()
        {
            string text = $"exec CountProduct";
            using (SqlCommand cmd = new (text, connection))
            {
                
                connection.Open();
                object count = cmd.ExecuteScalar();
                int value = (int)count;
                Console.WriteLine($"Counter {value}");
                return value;
            }
        }

        //public void DeleteCartItem(Guid productid, Guid id)
        //{
        //    WriteProcedure("DeleteCartItem", new Dictionary<string, object>
        //    {
        //        {"@productid", productid },
        //        {"@id", id }
        //    });
        //}

        public Cart GetCartId(Guid userid)
        {
            
            var cartid = ReadProcedure<Cart>("GetCartId", new Dictionary<string, object>
            {
                {"@userid",  userid}
            });
            return cartid[0];
        }
        public void UpdateCartItem(Guid cartid, Guid productid, int qty)
        {
            WriteProcedure("UpdateCartItem", new Dictionary<string, object>
            {
                {"@CartId", cartid },
                {"@ProductId", productid },
                {"@qty", qty }
            });
            Log($"Updated to card: {cartid} product: {productid} qty: {qty}");
        }
        public void DeleteCartItem(Guid cartid, Guid productid)
        {
            WriteProcedure("DeleteCartItem", new Dictionary<string, object>
            {
                {"@CartId", cartid },
                {"@ProductId", productid }
            });
        }
        public void DeleteAllCartItem(Guid cartid)
        {
            WriteProcedure("DeleteAllCartItem", new Dictionary<string, object>
            {
                {"@CartId", cartid }
            });
        }
        //TODO 
        public void AddressUpdate(Guid id, string description, string name)
        {
            WriteProcedure("UpdateAddress", new Dictionary<string, object>{
                {"",""}
            } );
        }

        public bool CheckReview(Guid userid, Guid productid)
        {
          
            var count = ReadProcedure<ProductReview>("CheckReview", new Dictionary<string, object>{
                {"@userid", userid},
                {"@productid",productid}
            });
            if (count.Count == 0) return false;
            else return true;
            
        }
        public List<Product> Search(string text, string page)
        {
            var list = ReadProcedure<Product>("Search", new Dictionary<string, object>
            {
                {"@text", text},
                {"@page", page}
            });
            return list;
        }

        public int SearchCount(string text, string page)
        {
            string result = $"exec SearchCount @text='{text}', @page={page}";
            using (SqlCommand cmd = new (result, connection))
            {
                
                connection.Open();
                object count = cmd.ExecuteScalar();
                int value = (int)count;
                Console.WriteLine($"Counter {count.ToString()}");
                return value;
            }
            // var list = ReadProcedure<int>("SearchCount", new Dictionary<string, object>
            // {
            //     {"@text", text},
            //     {"@page", page}

            // });     
            // Console.WriteLine(list[0])   ;    
            // return list[0];
            
        }

        public List<OrderView> GetOrder(Guid userid)
        {
            var oreders = ReadProcedure<OrderView>("GetOrder", new Dictionary<string, object>
            {
                { "@userid", userid}
            });
            return oreders;
        }
        public List<Product> GetShopProducts(Guid userid)
        {
            var products = ReadProcedure<Product>("GetShopProducts", new Dictionary<string, object>
            {
                {"@userid", userid},
            });
            return products;
        }
        public User SelfUser(Guid id)
        {
            var user = ReadProcedure<User> ("SelfUser", new Dictionary<string, object>{
                {"@id", id}
            });
            return user[0];
        }
        public Shop GetShopByUser(Guid userid)
        {
            var shop = ReadProcedure<Shop>("GetShop3", new Dictionary<string, object>
            {
                { "@userid", userid }
            });
            return shop[0];
        }

        public List<CartView> GetOrderedProducts(Guid orderid)
        {
            var cart = ReadProcedure<CartView>("GetOrderProducts", new Dictionary<string, object>
            {
                {"@orderid", orderid }
            });
            return cart;
        }
    }
}
