import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type EnhancedCalendarProps = React.ComponentProps<typeof DayPicker>;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function EnhancedCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: EnhancedCalendarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
  
  // State for manual month/year navigation
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentCalendarYear, setCurrentCalendarYear] = React.useState(currentYear);

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentCalendarYear(today.getFullYear());
    if ('onSelect' in props && props.onSelect) {
      (props.onSelect as any)(today);
    }
  };

  const handleMonthChange = (monthIndex: string) => {
    setCurrentMonth(parseInt(monthIndex));
  };

  const handleYearChange = (year: string) => {
    setCurrentCalendarYear(parseInt(year));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-4 py-3 bg-muted/30 rounded-lg border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={handleTodayClick}
          className="h-8 px-4 text-xs bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
        >
          Today
        </Button>
        <div className="flex items-center gap-3">
          <Select value={currentMonth.toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-8 w-auto min-w-[90px] border bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium px-3">
              <SelectValue>{months[currentMonth]}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-background border z-50">
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={currentCalendarYear.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="h-8 w-auto min-w-[75px] border bg-accent text-accent-foreground hover:bg-accent/80 text-xs font-medium px-3">
              <SelectValue>{currentCalendarYear}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-background border z-50">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border-t border-border"></div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        month={new Date(currentCalendarYear, currentMonth)}
        onMonthChange={(month) => {
          setCurrentMonth(month.getMonth());
          setCurrentCalendarYear(month.getFullYear());
        }}
        className={cn("p-3 pointer-events-auto", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center gap-2",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  );
}
EnhancedCalendar.displayName = "EnhancedCalendar";

export { EnhancedCalendar };