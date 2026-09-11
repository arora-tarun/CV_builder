import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    template: {
      type: String,
      default: "default",
    },

    source: {
      type: String,
      enum: ["builder", "upload"],
      default: "builder",
    },

    //This is the content of the editor
    content: {
      basic: {
        profileImage: String,
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        summary: String,

        socials: {
          linkedin: String,
          github: String,
          portfolio: String,
          twitter: String,
        },
      },

      education: [
        {
          degree: String,
          institution: String,
          percentage: String,
          startYear: String,
          endYear: String,
        },
      ],

      experience: [
        {
          company: String,
          location: String,
          role: String,        
          ctc: String,
          startDate: String,
          endDate: String,
          description: String,
          technologies: [String],
        },
      ],

      projects: [
        {
          title: String,
          teamSize: String,
          duration: String,
          technologies: [String],
          description: String,
        },
      ],

      skills: [
        {
          name: String,
          level: Number,
        },
      ],

      certificates: [
        {
          name: String,
          authority: String,
          year: String,
          link: String,
        },
      ],
    },

// This is the payment method schema 
   payment: {
  orderId: String,
  paymentId: String,
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
},

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CVModel = mongoose.model("CV", cvSchema);
