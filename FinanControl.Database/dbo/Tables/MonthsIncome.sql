CREATE TABLE [dbo].[MonthsIncome] (
    [Id]        UNIQUEIDENTIFIER   CONSTRAINT [DF_MonthsIncome_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Income_Id] UNIQUEIDENTIFIER   NULL,
    [Month]     BIGINT             NULL,
    [Status]    BIT                NOT NULL,
    [Creation]  DATETIMEOFFSET (7) CONSTRAINT [DF_MonthsIncome_Creation] DEFAULT (getdate()) NULL,
    [Updated]   DATETIMEOFFSET (7) CONSTRAINT [DF_MonthsIncome_Updated] DEFAULT (getdate()) NULL,
    [UpdatedId] UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_MonthsIncome] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_MonthsIncome_MonthsIncome] FOREIGN KEY ([Income_Id]) REFERENCES [dbo].[Income] ([Id]),
    CONSTRAINT [IX_MonthsIncome] UNIQUE NONCLUSTERED ([Id] ASC, [Month] ASC)
);

