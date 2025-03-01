export default function Pagination({ itemCount, loading = false }) {
  if (loading) return null;

  return (
    <div className="pagination">
      <div>
        Rows per page:
        <select name="" id=""></select>
        <span>{itemCount} items</span>
      </div>
    </div>
  );
}
