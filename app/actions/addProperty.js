"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(prevState, formData) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return { error: "User ID is required! Please log in to add a property." };
    }
    const { userId } = sessionUser;
    //accessing all values from amenities and images
    const amenities = formData.getAll("amenities");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Convert string values to numbers
    const beds = parseInt(formData.get("beds"), 10);
    const baths = parseInt(formData.get("baths"), 10);
    const square_feet = parseInt(formData.get("square_feet"), 10);
    const nightlyRate = formData.get("rates.nightly");
    const monthlyRate = formData.get("rates.monthly");
    const weeklyRate = formData.get("rates.weekly");
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
      amenities,
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
    const imageUrls = [];
    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      //convert to base64:
      const imageBase64 = imageData.toString("base64");
      // Detect image MIME type
      const mimeType = imageFile.type || "image/jpeg";
      //make request to cloudinary:
      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${imageBase64}`,
        { folder: "lidhoobnb" }
      );
      imageUrls.push(result.secure_url);
    }
    propertyData.images = imageUrls;
    const newProperty = new Property(propertyData);
    await newProperty.save();
    revalidatePath("/", "layout");
    // Redirect after successful save (redirect throws, so it needs to be outside catch)
    redirect(`/properties/${newProperty._id}`);
  } catch (error) {
    // Check if it's a redirect error - if so, re-throw it
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      error.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Error adding property:", error);
    return {
      error: error.message || "Failed to add property. Please try again.",
    };
  }
}
export default addProperty;
