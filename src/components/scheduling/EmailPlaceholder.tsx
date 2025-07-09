
import { Card, CardContent } from '@/components/ui/card';

export const EmailPlaceholder = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-white text-xl font-semibold mb-4">Email Feature Coming Soon</h3>
          <p className="text-white/70">
            Email functionality requires backend integration. Please connect to Supabase to enable email features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
