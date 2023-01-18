export const dateTimeFormatter = (dateTime: string): string => {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(new Date(dateTime));
};
