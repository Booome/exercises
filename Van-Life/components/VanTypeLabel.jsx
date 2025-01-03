export function VanTypeLabel({ type }) {
    return (
        <div
            className={`bg-type-${type}-bg text-orange-100 inline-block w-auto px-4 py-2 rounded-lg`}
        >
            {type[0].toUpperCase() + type.slice(1)}
        </div>
    );
}
