import "./EmptyState.css";
import Button from "../Button/Button";

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      {/* Title */}
      <h3 className="empty-state__title">{title}</h3>

      {/* Description */}
      {description && (
        <p className="empty-state__description">{description}</p>
      )}

      {/* Optional action button */}
      {actionLabel && onAction && (
        <div className="empty-state__action">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
