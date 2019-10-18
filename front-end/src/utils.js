export const StatusCode = {
  NOT_MODIFIED: 304
};

export const formatGender = (gender) => {
  switch (gender) {
    case 'male':
      return '♂';
    case 'female':
      return '♀';
    default:
      return '-';
  }
};
