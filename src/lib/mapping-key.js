export const keyMappingUtils = {
    mapStatus: (status) => {
      const statuses = {
        0: {
          status,
          text: "Inactive",
          color: "color-red",
          bgColor: "red-100",
        },
        1: {
          status,
          text: "Active",
          color: "green",
          bgColor: "green-100",
        },
      };
      return (
        statuses[status] ?? {
          status,
          text: "Unknown",
          color: "gray",
          bgColor: "gray-100",
        }
      );
    },
  };
  