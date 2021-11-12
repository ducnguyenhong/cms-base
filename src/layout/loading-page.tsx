import LoadingImage from 'assets/images/loading-page.gif';

export function LoadingPage() {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <img src={LoadingImage} alt="loading" />
    </div>
  );
}
