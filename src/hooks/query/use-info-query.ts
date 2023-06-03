import { infoApi } from '@/apis';
import { DataUser, DataUserDetailQuery } from '@/features/user';
import { useQuery } from '@tanstack/react-query';

const useInfoQuery = () => {
  return useQuery<DataUserDetailQuery, unknown, DataUser>({
    queryKey: ['profile', 'info'],
    queryFn: infoApi,
    select: (data) => data.user,
  });
};

export default useInfoQuery;
