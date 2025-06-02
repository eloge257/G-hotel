
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingStep4 from "./BookingStep4";
import { BookingFormValues, GuestDetail } from "./admin/bookings/BookingFormSchema";

const BookingProcess = () => {
  const [currentStep, setCurrentStep] = useState("step1");
  const [bookingData, setBookingData] = useState<Partial<BookingFormValues>>({
    hotelName: "",
    roomType: "",
    roomNumber: "",
    checkIn: "",
    checkInTime: "14:00",
    checkOut: "",
    checkOutTime: "11:00",
    guests: 2,
    guestsDetails: [],
    guestName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "",
    status: "pending",
    totalPrice: 0,
  });

  const updateBookingData = (data: Partial<BookingFormValues>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const handleContinue = (nextStep: string) => {
    setCurrentStep(nextStep);
  };

  // Load initial booking data from session storage if available
  React.useEffect(() => {
    const storedBooking = sessionStorage.getItem("ruzizi_booking");
    if (storedBooking) {
      const parsedData = JSON.parse(storedBooking);
      updateBookingData({
        hotelName: parsedData.hotelId || "",
        guests: parsedData.guests?.adults || 2,
        checkIn: parsedData.dates?.checkIn 
          ? new Date(parsedData.dates.checkIn).toISOString().split('T')[0] 
          : "",
        checkOut: parsedData.dates?.checkOut 
          ? new Date(parsedData.dates.checkOut).toISOString().split('T')[0] 
          : "",
      });
    }
  }, []);

  return (
    <div>
      <div className="mb-8">
        <Tabs value={currentStep} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger
              value="step1"
              className="data-[state=active]:bg-ruzizi-blue data-[state=active]:text-white"
              disabled
            >
              <span className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-ruzizi-blue mr-2 flex items-center justify-center text-white text-sm">
                  1
                </span>
                <span className="hidden sm:inline">Sélection</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="step2"
              className="data-[state=active]:bg-ruzizi-blue data-[state=active]:text-white"
              disabled
            >
              <span className="flex items-center">
                <span 
                  className={`w-6 h-6 rounded-full ${
                    ["step2", "step3", "step4"].includes(currentStep) 
                      ? "bg-ruzizi-blue" : "bg-gray-200"
                  } mr-2 flex items-center justify-center ${
                    ["step2", "step3", "step4"].includes(currentStep) 
                      ? "text-white" : "text-gray-500"
                  } text-sm`}
                >
                  2
                </span>
                <span className="hidden sm:inline">Options</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="step3"
              className="data-[state=active]:bg-ruzizi-blue data-[state=active]:text-white"
              disabled
            >
              <span className="flex items-center">
                <span 
                  className={`w-6 h-6 rounded-full ${
                    ["step3", "step4"].includes(currentStep) 
                      ? "bg-ruzizi-blue" : "bg-gray-200"
                  } mr-2 flex items-center justify-center ${
                    ["step3", "step4"].includes(currentStep) 
                      ? "text-white" : "text-gray-500"
                  } text-sm`}
                >
                  3
                </span>
                <span className="hidden sm:inline">Informations</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="step4"
              className="data-[state=active]:bg-ruzizi-blue data-[state=active]:text-white"
              disabled
            >
              <span className="flex items-center">
                <span 
                  className={`w-6 h-6 rounded-full ${
                    currentStep === "step4" 
                      ? "bg-ruzizi-blue" : "bg-gray-200"
                  } mr-2 flex items-center justify-center ${
                    currentStep === "step4" 
                      ? "text-white" : "text-gray-500"
                  } text-sm`}
                >
                  4
                </span>
                <span className="hidden sm:inline">Paiement</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step1">
            <BookingStep1
              onContinue={() => handleContinue("step2")}
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          </TabsContent>
          <TabsContent value="step2">
            <BookingStep2
              onContinue={() => handleContinue("step3")}
              onBack={() => handleContinue("step1")}
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          </TabsContent>
          <TabsContent value="step3">
            <BookingStep3
              onContinue={() => handleContinue("step4")}
              onBack={() => handleContinue("step2")}
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          </TabsContent>
          <TabsContent value="step4">
            <BookingStep4
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingProcess;
