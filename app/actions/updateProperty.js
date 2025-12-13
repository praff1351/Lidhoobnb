"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required! Please log in to add a property." };
  }
  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  //verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current owner does not own this property");
  }

  const beds = parseInt(formData.get("beds"));
  const baths = parseInt(formData.get("baths"));
  const square_feet = parseInt(formData.get("square_feet"));

  const nightlyRate = parseInt(formData.get("rates.nightly"));
  const monthlyRate = parseInt(formData.get("rates.monthly"));
  const weeklyRate = parseInt(formData.get("rates.weekly"));

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: beds,
    baths: baths,
    square_feet: square_feet,
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: nightlyRate ? parseFloat(nightlyRate) : undefined,
      monthly: monthlyRate ? parseFloat(monthlyRate) : undefined,
      weekly: weeklyRate ? parseFloat(weeklyRate) : undefined,
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
export default updateProperty;
