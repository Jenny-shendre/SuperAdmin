import axios from "axios";

export const fetchDirectVisitors = async (interval) => {
  const response = await axios.get('https://project-rof.vercel.app/api/overview/direct-visitors', 
 
    {
      params: { interval },
    }
  );
  return response.data;
};

export const fetchChannelVisitors = async (interval) => {
  // const response = await axios.get(
  //   "https://project-rof.vercel.app/api/overview/channel-visitors",
    {
      params: { interval },
    }
  );
  return response.data;
};

export const dealsClosedResponse = async (interval) => {
  const response = await axios.get(
    "https://project-rof.vercel.app/api/overview/total-DealsClosed",
    {
      params: { interval },
    }
  );
  return response.data;
};

export const fetchTotalMeetings = async (interval) => {
  const response = await axios.get(
    "https://project-rof.vercel.app/api/overview/total-meetings",
    {
      params: { interval },
    }
  );
  return response.data;
};

export const StaffOnline = async (interval) => {
  const response = await axios.get(
    "https://project-rof.vercel.app/api/overview/total-status",
    {
      params: { interval },
    }
  );
  return response.data;
};

export const BargraphData = async (interval) => {
  const response = await axios.get(
    "https://project-rof.vercel.app/api/overview/Bar",
    {
      params: { interval },
    }
  );
  return response.data;
};
