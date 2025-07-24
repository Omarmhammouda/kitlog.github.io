"""Update equipment schema

Revision ID: 004
Revises: 003
Create Date: 2025-07-24 14:58:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '004'
down_revision = '003'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Check if equipment table exists, if not create it
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    
    if 'equipment' not in inspector.get_table_names():
        # Create equipment table if it doesn't exist
        op.create_table(
            'equipment',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(), nullable=False),
            sa.Column('description', sa.Text(), nullable=True),
            sa.Column('category', sa.String(), nullable=False),
            sa.Column('brand', sa.String(), nullable=True),
            sa.Column('model', sa.String(), nullable=True),
            sa.Column('serial_number', sa.String(), nullable=True),
            sa.Column('condition', sa.String(), nullable=True),
            sa.Column('is_available', sa.Boolean(), nullable=True),
            sa.Column('location', sa.String(), nullable=True),
            sa.Column('notes', sa.Text(), nullable=True),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
            sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
            sa.Column('owner_id', sa.String(), nullable=True),
            sa.Column('owner_name', sa.String(), nullable=True),
            sa.Column('team_id', sa.Integer(), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
            sa.UniqueConstraint('serial_number')
        )
        op.create_index(op.f('ix_equipment_id'), 'equipment', ['id'], unique=False)
        op.create_index(op.f('ix_equipment_name'), 'equipment', ['name'], unique=False)
        op.create_index(op.f('ix_equipment_category'), 'equipment', ['category'], unique=False)
        op.create_index(op.f('ix_equipment_serial_number'), 'equipment', ['serial_number'], unique=False)
        op.create_index(op.f('ix_equipment_owner_id'), 'equipment', ['owner_id'], unique=False)
    else:
        # Equipment table exists, update it
        existing_columns = {col['name'] for col in inspector.get_columns('equipment')}
        
        # Add missing columns
        if 'condition' not in existing_columns:
            op.add_column('equipment', sa.Column('condition', sa.String(), nullable=True))
            # Update existing records to have default condition
            op.execute("UPDATE equipment SET condition = 'good' WHERE condition IS NULL")
        
        if 'is_available' not in existing_columns:
            op.add_column('equipment', sa.Column('is_available', sa.Boolean(), nullable=True))
            # Update existing records to be available by default
            op.execute("UPDATE equipment SET is_available = true WHERE is_available IS NULL")
        
        if 'owner_name' not in existing_columns:
            op.add_column('equipment', sa.Column('owner_name', sa.String(), nullable=True))
        
        # Check if owner_id needs to be converted from Integer to String
        owner_id_col = next((col for col in inspector.get_columns('equipment') if col['name'] == 'owner_id'), None)
        if owner_id_col and str(owner_id_col['type']).upper().startswith('INTEGER'):
            # Drop foreign key constraint if it exists
            try:
                op.drop_constraint('equipment_owner_id_fkey', 'equipment', type_='foreignkey')
            except:
                pass  # Constraint might not exist
            
            # Convert owner_id to String
            op.alter_column('equipment', 'owner_id',
                          existing_type=sa.Integer(),
                          type_=sa.String(),
                          existing_nullable=True)
        
        # Remove status column if it exists (replaced by condition and is_available)
        if 'status' in existing_columns:
            # Migrate data from status to condition and is_available
            op.execute("""
                UPDATE equipment 
                SET condition = CASE 
                    WHEN status = 'needs_repair' THEN 'needs_repair'
                    ELSE 'good'
                END,
                is_available = CASE 
                    WHEN status = 'available' THEN true
                    ELSE false
                END
                WHERE condition IS NULL OR is_available IS NULL
            """)
            op.drop_column('equipment', 'status')


def downgrade() -> None:
    # Add back status column
    op.add_column('equipment', sa.Column('status', sa.String(), nullable=True))
    
    # Migrate data back from condition and is_available to status
    op.execute("""
        UPDATE equipment 
        SET status = CASE 
            WHEN condition = 'needs_repair' THEN 'needs_repair'
            WHEN is_available = true THEN 'available'
            ELSE 'unavailable'
        END
    """)
    
    # Convert owner_id back to Integer
    op.alter_column('equipment', 'owner_id',
                   existing_type=sa.String(),
                   type_=sa.Integer(),
                   existing_nullable=True)
    
    # Drop the new columns
    op.drop_column('equipment', 'owner_name')
    op.drop_column('equipment', 'is_available')
    op.drop_column('equipment', 'condition')
