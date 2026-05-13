# MC-02-04 — Backend: CRUD de Eventos (Spring Boot)

> Implementación en el repositorio **backend**. Este documento sirve de contrato
> para el equipo de backend y de referencia para las llamadas del frontend.

---

## Entidades JPA

### Event

```java
@Entity
@Table(name = "events")
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private LocalDate fecha;
    private LocalTime hora;
    private String ubicacion;
    private Double latitud;
    private Double longitud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Category categoria;

    private String imagenUrl;
    private Double precio;
    private String enlaceCompra;
}
```

### Category

```java
@Entity
@Table(name = "categories")
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private String icono;
}
```

---

## EventController

```java
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "${frontend.url:http://localhost:3000}")
public class EventController {

    @GetMapping
    public Page<EventDTO> getAll(
        @RequestParam(required = false) Long category,
        @RequestParam(defaultValue = "0")  int page,
        @RequestParam(defaultValue = "12") int size
    ) { ... }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getById(@PathVariable Long id) { ... }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventDTO> create(@Valid @RequestBody CreateEventRequest req) { ... }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventDTO> update(@PathVariable Long id, @Valid @RequestBody UpdateEventRequest req) { ... }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) { ... }
}
```

---

## EventDTO (respuesta al frontend)

```java
public record EventDTO(
    Long id,
    String titulo,
    String descripcion,
    String fecha,       // ISO-8601: "2026-06-15"
    String hora,        // "HH:mm"
    String ubicacion,
    Double latitud,
    Double longitud,
    Long categoriaId,
    CategoryDTO categoria,
    String imagenUrl,
    Double precio,
    String enlaceCompra
) {}
```

---

## Endpoints y respuestas esperadas por el frontend

| Método | Ruta                          | Auth   | Respuesta                     |
|--------|-------------------------------|--------|-------------------------------|
| GET    | `/api/events`                 | —      | `Page<EventDTO>`              |
| GET    | `/api/events?category={id}`   | —      | `Page<EventDTO>` filtrada     |
| GET    | `/api/events/{id}`            | —      | `EventDTO`                    |
| POST   | `/api/events`                 | ADMIN  | `EventDTO` creado (201)       |
| PUT    | `/api/events/{id}`            | ADMIN  | `EventDTO` actualizado        |
| DELETE | `/api/events/{id}`            | ADMIN  | 204 No Content                |
| GET    | `/api/categories`             | —      | `List<CategoryDTO>`           |

---

## Datos de ejemplo (seed SQL)

```sql
INSERT INTO categories (nombre, descripcion, icono) VALUES
  ('Música',     'Conciertos y festivales musicales',       '🎵'),
  ('Teatro',     'Obras y representaciones teatrales',      '🎭'),
  ('Arte',       'Exposiciones y galerías de arte',          '🎨'),
  ('Cine',       'Festivales y proyecciones',                '🎬'),
  ('Danza',      'Espectáculos de danza y ballet',           '💃'),
  ('Literatura', 'Presentaciones de libros y lecturas',      '📚');

INSERT INTO events (titulo, descripcion, fecha, hora, ubicacion, latitud, longitud, categoria_id, imagen_url, precio, enlace_compra) VALUES
  ('Festival de Jazz de Tenerife',
   'La decimocuarta edición del Festival de Jazz...',
   '2026-06-15', '20:30',
   'Auditorio de Tenerife, Santa Cruz de Tenerife',
   28.4636, -16.2518, 1,
   'https://picsum.photos/seed/jazz-tenerife/800/450',
   25.00, 'https://www.auditoriodetenerife.com'),

  ('Carnaval de Santa Cruz de Tenerife',
   'Declarado Fiesta de Interés Turístico Internacional...',
   '2026-02-20', '22:00',
   'Plaza de España, Santa Cruz de Tenerife',
   28.4682, -16.2546, 1,
   'https://picsum.photos/seed/carnaval-tenerife/800/450',
   0.00, '');
  -- (añadir el resto de eventos del mock)
```

---

## CORS (application.properties)

```properties
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

---

## Notas para el frontend

- La paginación devuelve un objeto `Page<T>` de Spring (campos: `content`, `totalElements`, `totalPages`, `number`, `size`).
- El frontend en MC-02-05 lee `response.content` para obtener el array de eventos.
- Fechas en ISO-8601: `"2026-06-15"` (fecha) y `"20:30"` (hora) como strings independientes.
