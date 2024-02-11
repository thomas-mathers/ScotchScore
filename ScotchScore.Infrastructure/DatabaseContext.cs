using Microsoft.EntityFrameworkCore;
using ScotchScore.Domain;

namespace ScotchScore.Infrastructure;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<ReviewVote> ReviewVotes => Set<ReviewVote>();
    public DbSet<Scotch> Scotches => Set<Scotch>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Scotch>().ToContainer("Scotches");
        modelBuilder.Entity<Scotch>().HasNoDiscriminator();
        modelBuilder.Entity<Scotch>().HasKey(x => x.Id);
        modelBuilder.Entity<Scotch>().HasPartitionKey(x => x.Id);
        modelBuilder.Entity<Scotch>().Property(x => x.Id).ToJsonProperty("id");
        modelBuilder.Entity<Scotch>().Property(x => x.Region).HasConversion<string>();
        modelBuilder.Entity<Scotch>().Property(x => x.Currency).HasConversion<string>();

        modelBuilder.Entity<Review>().ToContainer("Reviews");
        modelBuilder.Entity<Review>().HasNoDiscriminator();
        modelBuilder.Entity<Review>().HasKey(x => x.Id);
        modelBuilder.Entity<Review>().HasPartitionKey(x => x.ScotchId);
        modelBuilder.Entity<Review>().Property(x => x.Id).ToJsonProperty("id");

        modelBuilder.Entity<ReviewVote>().ToContainer("ReviewVotes");
        modelBuilder.Entity<ReviewVote>().HasNoDiscriminator();
        modelBuilder.Entity<ReviewVote>().HasKey(x => x.Id);
        modelBuilder.Entity<ReviewVote>().HasPartitionKey(x => x.ScotchId);
        modelBuilder.Entity<ReviewVote>().Property(x => x.Id).ToJsonProperty("id");

        base.OnModelCreating(modelBuilder);
    }
}