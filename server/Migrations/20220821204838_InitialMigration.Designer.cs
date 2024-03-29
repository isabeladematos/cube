﻿// <auto-generated />
using System;
using Cube.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace cube_api.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20220821204838_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Cube.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ProductDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SellerName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("TypeId")
                        .HasColumnType("integer");

                    b.Property<decimal>("Value")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Cube.Models.TransactionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nature")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TransactionTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Venda produtor",
                            Nature = "INCOME"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Venda afiliado",
                            Nature = "INCOME"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Comissão paga",
                            Nature = "EXPENSE"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Comissão recebida",
                            Nature = "INCOME"
                        });
                });

            modelBuilder.Entity("Cube.Models.Transaction", b =>
                {
                    b.HasOne("Cube.Models.TransactionType", "Type")
                        .WithMany("Transactions")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Type");
                });

            modelBuilder.Entity("Cube.Models.TransactionType", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}
